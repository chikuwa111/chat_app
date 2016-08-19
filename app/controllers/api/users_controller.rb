module Api
  class UsersController < ApplicationController

    def index
      @users = User.where.not(email: current_user.email)
      render json: @users
    end

  end
end