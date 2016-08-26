module Api
  class UsersController < ApplicationController

    def index
      @users = User.where.not(id: current_user.id)
      render json: @users
    end

    def friends_data
      @json = current_user.friends.map { |f|
        user_data = f.as_json()
        user_data['last_action'] = f.last_action_with(current_user)
        user_data['last_action_timestamp'] = f.last_action_timestamp_with(current_user)
        user_data
      }
      render json: @json.sort_by{|d| d['last_action_timestamp']}.reverse
    end

  end
end