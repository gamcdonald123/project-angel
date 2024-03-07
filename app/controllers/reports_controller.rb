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
    @report = Report.new(report_params)
    @report.user = current_user
    if @report.save
      redirect_to reports_path(@report)
    else
      render :new, status: :unprocessable_entity
    end
  end

private

  def report_params
    params.require(:report).permit(:report_type, :location, :description)
  end
end
