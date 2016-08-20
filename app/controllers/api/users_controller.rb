module Api
  class UsersController < ApplicationController
    protect_from_forgery :except => [:index, :friend]

    def index
      @users = User.where.not(email: current_user.email)
      render json: @users
    end

    def friend
      @users = current_user.friends
      render json: @users
    end

  end
end