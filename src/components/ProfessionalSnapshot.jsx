import React from "react";

const ROLES = [
  {
    company: "JPMorgan Chase",
    role: "Site Reliability Engineer",
    period: "2022-present",
    summary: "Automation, observability, incident response, DR readiness, and production support."
  },
  {
    company: "AMC Networks / HIDIVE",
    role: "DevOps Engineer",
    period: "2021-2022",
    summary: "CI/CD, infrastructure security, deployment workflows, and streaming reliability."
  },
  {
    company: "Tata Consultancy Services / GE",
    role: "Cloud Engineer",
    period: "2019-2021",
    summary: "AWS, Linux recovery, configuration management, Jenkins, and Ansible."
  }
];

export default function ProfessionalSnapshot() {
  return (
    <section className="work-section" aria-labelledby="work-heading">
      <div className="section-heading">
        <p className="section-heading__kicker">Professional snapshot</p>
        <h2 id="work-heading">Reliability work behind the projects.</h2>
      </div>

      <div className="work-list">
        {ROLES.map((role) => (
          <article className="work-item" key={`${role.company}-${role.period}`}>
            <div>
              <h3>{role.company}</h3>
              <p>{role.role}</p>
            </div>
            <p className="work-item__summary">{role.summary}</p>
            <span>{role.period}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
