class ActionCableBroadcastJob < ApplicationJob
  queue_as :critical

  def perform(members, event_name, data)
    return if members.blank?

    broadcast_to_members(members, event_name, data)
  end

  private

  def broadcast_to_members(members, event_name, broadcast_data)
    members.each do |member|
      ActionCable.server.broadcast(
        member,
        {
          event: event_name,
          data: broadcast_data
        }
      )
    end
  end
end
