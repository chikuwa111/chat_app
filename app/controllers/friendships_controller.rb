class FriendshipsController < ApplicationController
  protect_from_forgery :except => [:create, :destroy]

  def create
    user = User.find(params[:to_user_id])
    # 以下の3行はUserモデルにうつしてメソッドにしちゃいましょう。
    # if current_user.friend?(user)
    # みたいに使う
    friendship = current_user.friendships_of_from_user.find_by(to_user_id: user.id)
    inverse_friendship = user.friendships_of_from_user.find_by(to_user_id: current_user.id)
    # !!は必要かな？
    if !!(inverse_friendship) || !!(friendship)
      redirect_to messages_url
      return
    end
    current_user.friendships_of_from_user.create(to_user_id: user.id)
    flash[:notice] = "Successfully make friends with #{user.name}!"
    redirect_to messages_url
  end

  def destroy
    friendship = current_user.friendships_of_from_user.find_by(to_user_id: params[:id])
    if !!(friendship)
      friendship.destroy
    else
      inverse_friendship = current_user.friendships_of_to_user.find_by(from_user_id: params[:id])
      inverse_friendship.destroy
    end
    flash[:notice] = "Successfully resolved friendship."
    redirect_to root_url
  end
end
