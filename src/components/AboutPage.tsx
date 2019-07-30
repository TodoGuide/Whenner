import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div>
      <h2>About Whenner</h2>
      <p>
        Whenner is for folks that like to be helpful, take on new challenges,
        and try new hobbies SO MUCH that they sometimes overcommit, don't finish
        what they started, and procrastinate on boring-but-important tasks.
        Whenner is a task management app that gives users{" "}
        <em>time perspective</em> by intelligently <em>scheduling</em> tasks.
        Unlike other task-tracking apps that display a tasks as lists, Whenner
        maps your tasks to your day so you know exactly what you can and can't
        get done today, tomorrow, and beyond.
      </p>
      <h3>How Whenner Works</h3>
      <p>
        You tell Whenner what you want to do, how long you think it will take,
        and in what order you want to do it in. Whenner then displays your tasks
        on a calendar instead of a list. When there's not enough time to finish
        a task before your next appointment or the day's end, it will be
        automatically pushed off.
      </p>
      <p>
        The result? You see what you can get done today, and what tasks you can
        complete before something else interrupts you. Got distracted? No
        problem. Whenner will keep pushing out your schedule automatically.
        Finished a task ahead of time? Congrats! Whenner will tighten your
        schedule to show what else you can get done with the extra time!
      </p>
      <h2>Features</h2>
      <ul>
        <li>Auto-schedule tasks to always start "now"</li>
        <li>Schedule around appointments and Chronotype</li>
        <li>Simple drag-and-drop to arrange tasks</li>
        <li>Works offline</li>
      </ul>
      <h3>Near-term Features (single user)</h3>
      <ul>
        <li>Display appointments from Google Calendar</li>
        <li>Display appointments from Office 365 (Outlook</li>
        <li>Multiple chronotypes (per task?)</li>
        <li>Store data on Google Drive and/or OneDrive</li>
        <li>Stats: Actual vs. estimates (lead &amp; cycle time)</li>
        <li>
          Predictions: Given an estiate and priority, when will a task REALLY be
          finished?
        </li>
        <li>Predecessors and successors to keep dependent tasks in order</li>
        <li>
          Earliest task start: Do not schedule a task for before a set time
        </li>
        <li>
          Latest task start: Increase a task priority so that it will always
          start before a set time
        </li>
      </ul>
      <h3>Far-out Features (multi user, small teams/families)</h3>
      <ul>
        <li>
          Shared tasks (where anyone can "take" and/or complete a shared task)
        </li>
        <li>
          Alerts/notifications: Get an email/push-notification when a task
          status changes
        </li>
        <li>
          Nested tasks: Tasks that can't me marked completed until all child
          tasks are done (also show percentage complete)
        </li>
      </ul>
      <h3>Way far-out Features ("enterprise" feaures - need serious funding)</h3>
      <ul>
        <li>Teams, groups, and related stats</li>
        <li>Capacity planning</li>
        <li>Reports, dashboards, and so on</li>
      </ul>
    </div>
  );
};

export default AboutPage;
