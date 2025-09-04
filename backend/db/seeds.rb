# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "faker"

Challenge.destroy_all

# 5.times do |i|
#   Challenge.create!(
#     title: "Challenge #{i + 1}",
#     description: "This is the content of post number #{i + 1}."
#   )
# end

20.times do |i|
  puts "Creating challenge #{i + 1}"
  Challenge.create!(
    title: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.sentence(word_count: 10),
    start_date: Faker::Time.between(from: DateTime.now - 1, to: DateTime.now + 1.day),
    end_date: Faker::Time.between(from: DateTime.now + 2.day, to: DateTime.now + 10.day)
  )
end
