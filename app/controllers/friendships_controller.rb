class FriendshipsController < ApplicationController

  def create
    user = User.find(params[:to_user_id])
    if current_user.friend?(user)
      redirect_to messages_url
      return
    end
    current_user.friendships_of_from_user.create(to_user_id: user.id, timestamp: params[:timestamp])
    flash[:notice] = "Successfully make friends with #{user.name}!"
    redirect_to messages_url
  end

  def destroy
    current_user.destroy_friendship_with(params[:id])
    flash[:notice] = "Successfully destroyed friendship."
    redirect_to root_url
  end
end
