class ReportsController < ApplicationController

  def index
    @reports = Report.all
  end

  def show
    @report = Report.find(params[:id])
  end

  def new
    @report = Report.new
  end

  def create
  end

private

  def report_params
    params.require(:report).permit(:report_type, :location, :description)
  end
end
