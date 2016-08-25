class AddTimestampToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :timestamp, :string
  end
end
