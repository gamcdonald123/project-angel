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
    @report.did_it_happen_to_you = params[:report][:did_it_happen_to_you] == "Yes"
    if @report.save!
      redirect_to reports_path(@report)
    else
      render :new, status: :unprocessable_entity
    end

  end

private

  def report_params
    params.require(:report).permit(:report_type, :location, :description, :did_it_happen_to_you, :date_and_time)
  end
end
