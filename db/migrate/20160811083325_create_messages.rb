class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :contents

      t.timestamps null: false
    end
  end
end
