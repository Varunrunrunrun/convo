"use client";
import React, { useState } from "react";
import HomeCard, { HomeCardProps } from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const homeCards: HomeCardProps[] = [
    {
      img: "/icons/add-meeting.svg",
      title: "New Meeting",
      description: "Start an instant meeting",
      className: "bg-orange-1",
      handleClick: () => setMeetingState("isInstantMeeting"),
    },
    {
      img: "/icons/join-meeting.svg",
      title: "Join Meeting",
      description: "via invitation link",
      className: "bg-blue-1",
      handleClick: () => setMeetingState("isJoiningMeeting"),
    },
    {
      img: "/icons/schedule.svg",
      title: "Schedule Meeting",
      description: "Plan your meeting",
      className: "bg-purple-1",
      handleClick: () => setMeetingState("isScheduleMeeting"),
    },
    {
      img: "/icons/recordings.svg",
      title: "View Recordings",
      description: "Meeting Recordings",
      className: "bg-yellow-1",
      handleClick: () => router.push("/recordings"),
    },
  ];
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error("Please select Date and Time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) router.push(`/meeting/${call.id}`);
      toast.success("Meeting created");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meeting");
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {homeCards.map((card, index) => (
        <HomeCard
          key={index}
          img={card.img}
          title={card.title}
          description={card.description}
          className={card.className}
          handleClick={card.handleClick}
        />
      ))}

      <MeetingModal
        onClose={() => setMeetingState(undefined)}
        isOpen={meetingState === "isInstantMeeting"}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
