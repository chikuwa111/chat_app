# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160823060913) do

  create_table "friendships", force: :cascade do |t|
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "friendships", ["from_user_id", "to_user_id"], name: "index_friendships_on_from_user_id_and_to_user_id", unique: true

  create_table "messages", force: :cascade do |t|
    t.string   "contents"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.string   "image"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                default: "", null: false
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "picture"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
