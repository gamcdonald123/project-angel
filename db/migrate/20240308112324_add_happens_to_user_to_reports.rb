class AddHappensToUserToReports < ActiveRecord::Migration[7.1]
  def change
    add_column :reports, :did_it_happen_to_you, :boolean
  end
end
