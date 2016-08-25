module Api
  class UsersController < ApplicationController

    def index
      @users = User.where.not(id: current_user.id)
      render json: @users
    end

    def friend
      @users = current_user.friends
      render json: @users
    end

  end
end