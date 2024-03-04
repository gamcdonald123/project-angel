require "test_helper"

class SafePlacesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get safe_places_index_url
    assert_response :success
  end

  test "should get show" do
    get safe_places_show_url
    assert_response :success
  end
end
