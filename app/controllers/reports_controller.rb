class ReportsController < ApplicationController

  def index
    @report = Report.all
  end

  def show
  end

  def new
    @report = Report.new
  end

  def create
  end
end
