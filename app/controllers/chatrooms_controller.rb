class ChatroomsController < ApplicationController

  def show
    @chatroom = Chatroom.find(params[:id])
    @message = Message.new
  end

  def index
    @chatrooms = Chatroom.all
  end

  def create
    @user = User.find(params[:user_id])
    if Chatroom.find_by(sender: current_user, receiver: @user) || Chatroom.find_by(sender: @user, receiver: current_user)
      @chatroom = Chatroom.find_by(sender: current_user, receiver: @user) || Chatroom.find_by(sender: @user, receiver: current_user)
      redirect_to chatroom_path(@chatroom)
    else
      @chatroom = Chatroom.new(sender: current_user, receiver: @user)
      if @chatroom.save
        redirect_to chatroom_path(@chatroom)
      else
        render :new
      end
    end

  end
end
