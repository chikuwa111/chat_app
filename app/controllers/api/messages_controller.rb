module Api
  class MessagesController < ApplicationController

    def index
      @messages = current_user.messages.sort_by{|message| message.id}
      render json: @messages
    end

    def create
      @message = Message.new(message_params)
      @message.from_user_id = current_user.id
      file = params[:image]
      if !file.nil?
        file_name =  Time.now().to_i.to_s + file.original_filename
        File.open("public/message_image/#{file_name}", 'wb') {
          |f| f.write(file.read)
        }
        @message.image = file_name
      end
      @message.save
      render json: @message
    end

    def last
      @last_messages = {}
      current_user.friends.each do |f|
        if (m = Message.where("from_user_id = :user1 and to_user_id = :user2",
                          user1: current_user.id, user2: f.id).last)
          last_message = m
        end

        if (m = Message.where("from_user_id = :user1 and to_user_id = :user2",
                          user1: f.id, user2: current_user.id).last)
          if !last_message || last_message.id < m.id
            last_message = m
          end
        end

        if !last_message
          last_message = {"contents": "", "to_user_id": 0,
                          "created_at": current_user.friendship_with(f.id).created_at}
        end
        @last_messages[f.id] = last_message
      end

      render json: @last_messages
    end

    private

      def message_params
        params.permit(:contents, :to_user_id, :image)
      end

  end

end
