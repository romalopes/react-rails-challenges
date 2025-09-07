
class Api::V1::ChallengesController < ApplicationController
  before_action :show_current_user
  before_action :authenticate_user! #, only: %i[create update destroy]
  before_action :set_challenge, only: %i[ show update destroy ]
  

  def show_current_user
    if current_user
      puts "id: #{current_user.id} email: #{current_user.email} name: #{current_user.name}"
    else
      
      puts "No user signed in"
    end

    
  end
  def authenticate_user!
    puts "\n\n\n\nuser_signed_in?:#{user_signed_in?}---- current_user:#{current_user}\n\n\n"
    puts "Current user: #{current_user.inspect}"

      raise "Authentication failed" unless user_signed_in?
  end
  # GET /challenges
  def index
    @challenges = Challenge.order(created_at: :desc)

    render json: @challenges
  end

  # GET /challenges/1
  def show
    render json: @challenge
  end

  # POST /challenges
  def create
    # @challenge = Challenge.new(challenge_params)
    @challenge = current_user.challenges.build(challenge_params)

    if @challenge.save
      # render json: @challenge, status: :created, location: @challenge
      render json: @challenge, status: :created, location: api_v1_challenge_url(@challenge.id)
    else
      render json: @challenge.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /challenges/1
  def update
    if @challenge.update(challenge_params)
      render json: @challenge
    else
      render json: @challenge.errors, status: :unprocessable_content
    end
  end

  # DELETE /challenges/1
  def destroy
    @challenge.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_challenge
      @challenge = Challenge.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def challenge_params
      puts "\n\n\nparams: #{params}\n\n"
      params.expect(challenge: [ :title, :description, :start_date, :end_date ])
    end

   
end