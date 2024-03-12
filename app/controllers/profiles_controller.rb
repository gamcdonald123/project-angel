class ProfilesController < ApplicationController

  def show
    @user = current_user
    @profile = @user.profile
  end

  def edit
  end

  def update
  end

end
