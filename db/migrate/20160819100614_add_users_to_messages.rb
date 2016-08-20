class AddUsersToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :from_user_id, :integer
    add_column :messages, :to_user_id, :integer
  end
end
