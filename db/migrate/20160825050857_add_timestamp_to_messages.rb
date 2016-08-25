class AddTimestampToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :timestamp, :string
  end
end
