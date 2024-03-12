class CommunitiesController < ApplicationController

  def index
    @communities = Community.all
  end

  def show
    @community = Community.find(params[:id])
    @post = Post.new
  end
end
