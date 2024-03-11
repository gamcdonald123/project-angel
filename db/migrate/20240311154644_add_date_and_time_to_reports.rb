class AddDateAndTimeToReports < ActiveRecord::Migration[7.1]
  def change
    add_column :reports, :date_and_time, :datetime
  end
end
