class FriendshipsController < ApplicationController
  protect_from_forgery :except => [:create, :destroy]

  def create
    user = User.find(params[:to_user_id])
    inverse_friendship = user.friendships_of_from_user.find_by(to_user_id: current_user.id)
    if !!(inverse_friendship)
      redirect_to messages_url
      return
    end
    current_user.friendships_of_from_user.create(to_user_id: user.id)
    flash[:notice] = "Successfully make friends with #{user.name}!"
    redirect_to root_url
  end

  def destroy
    Relationships.find(params[:id]).destroy
    flash[:notice] = "Successfully resolved."
    redirect_to root_url
  end
end
