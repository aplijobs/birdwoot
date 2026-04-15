namespace :messages do
  desc 'Wraps submitted_values Hash (non-CSAT) into an array in content_attributes'
  task fix_submitted_values: :environment do
    dry_run = ENV['DRY_RUN'] == 'true'
    batch_size = 1000
    total_fixed = 0

    puts dry_run ? '[DRY RUN] Counting affected messages...' : 'Fixing submitted_values...'

    scope = Message.where(
      "content_attributes -> 'submitted_values' IS NOT NULL
       AND jsonb_typeof(content_attributes -> 'submitted_values') = 'object'
       AND NOT (content_attributes -> 'submitted_values' ? 'csat_survey_response')"
    )

    total = scope.count
    puts "Found #{total} messages to fix."

    unless dry_run
      scope.in_batches(of: batch_size) do |batch|
        batch.update_all(
          "content_attributes = jsonb_set(
            content_attributes,
            '{submitted_values}',
            jsonb_build_array(content_attributes -> 'submitted_values')
          )"
        )
        total_fixed += batch.count
        print "."
        sleep(0.01)
      end

      puts "\nDone. Fixed #{total_fixed} messages."
    end
  end
end
