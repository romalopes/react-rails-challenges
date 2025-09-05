# README

```shell
$ rails new backend api -d=mysql
$ bundle
$ rails db:create
$ rails db:migrate
$ rails db:seed
$ rails generate model Challenge title:string description:text start_date:date end_date:date
$ rails g controller Challenges
```

Add Faker to create seed

#### Devise + JWT

https://dakotaleemartinez.com/tutorials/devise-jwt-api-only-mode-for-authentication/

```shell
$ bundle add devise
create config/initializers/devise.rb
create config/locales/devise.en.yml
$ rails generate devise:install
$ rails generate devise user
```

In devise.rb
config.navigational_formats = []

```shell
rails g devise:controllers users -c sessions registrations
rails g migration addJtiToUsers jti:string:index:unique
```

#### API for Users

#### Verify API with postman
