module Api
  class UsersController < ApplicationController

    def index
      @users = User.where.not(id: current_user.id)
      render json: @users
    end

    def friends_data
      @json = current_user.friends.map { |friend|
        user_data = friend.as_json()
        user_data['last_action'] = friend.last_action_with(current_user)
        user_data['last_action_timestamp'] = friend.last_action_timestamp_with(current_user)
        user_data
      }
      render json: @json.sort_by{|friend_data| friend_data['last_action_timestamp']}.reverse
    end

  end
end