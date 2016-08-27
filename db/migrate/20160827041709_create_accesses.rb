class CreateAccesses < ActiveRecord::Migration
  def change
    create_table :accesses do |t|
      t.integer :from_user_id
      t.integer :to_user_id
      t.datetime :from_user_access
      t.datetime :to_user_access

      t.timestamps null: false
    end
  end
end
