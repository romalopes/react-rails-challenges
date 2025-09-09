class Users::SessionsController < Devise::SessionsController
  # before_action :authenticate_request!
  include RackSessionFix
  respond_to :json

  private

  # def authenticate_request!
  #   if request.headers['Authorization'].blank?
  #     render json: {
  #       status: {
  #         code: 401,
  #         message: 'Login or Password is invalid'
  #       }
  #     }, status: :unauthorized
  #     return false
  #   end
  # end


  def respond_with(resource, _opt = {})
    @token = request.env['warden-jwt_auth.token']
    headers['Authorization'] = @token

    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        token: @token,
        data: {
          user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    puts "request.headers['Authorization']:#{request.headers['Authorization']}"
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split.last,
                               Rails.application.credentials.devise_jwt_secret_key!).first
      puts "jwt_payload['sub']:#{jwt_payload['sub']}"
      current_user = User.find(jwt_payload['sub'])
    else
      render json: {
        status: {
          code: 401,
          message: 'header Authorization is missing'
        }
      }, status: :unauthorized
      return
    end

    if current_user
      puts "current_user:#{current_user}"
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end