import type { AIResumeResponse } from "@/types/resume";
import styles from "./ResumePreviewType5.module.css";

export default function ResumePreviewType5({
  resume,
}: {
  resume: AIResumeResponse;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          {/* 프로필 섹션 */}
          <div className={styles.profile}>
            <div className={styles.name}>
              {resume.profileInfo.name || "이름"}
              {resume.profileInfo.english_name && (
                <span className={styles.englishName}>
                  {resume.profileInfo.english_name}
                </span>
              )}
            </div>
            <div className={styles.contactInfo}>
              {resume.profileInfo.contact && (
                <span className={styles.contactItem}>
                  {resume.profileInfo.contact}
                </span>
              )}
              {resume.profileInfo.desired_role && (
                <span className={styles.contactItem}>
                  • {resume.profileInfo.desired_role}
                </span>
              )}
            </div>
          </div>
          {/* 한줄소개 */}
          {resume.shortIntro && (
            <div className={styles.shortIntro}>{resume.shortIntro}</div>
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.leftColumn}>
            {/* 기술스택 */}
            {resume.skills.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>기술스택</h2>
                <div className={styles.skillsList}>
                  {resume.skills.map((s, i) => (
                    <span key={i} className={styles.skillTag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* 학력 */}
            {resume.educations.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>학력</h2>
                {resume.educations.map((e, i) => (
                  <div key={i} className={styles.item}>
                    <div className={styles.itemHeader}>
                      <h3 className={styles.itemTitle}>{e.name}</h3>
                      <span className={styles.itemPeriod}>{e.period}</span>
                    </div>
                    <div className={styles.itemDescription}>
                      {e.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* 동아리/활동 */}
            {resume.clubs.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>동아리/활동</h2>
                {resume.clubs.map((c, i) => (
                  <div key={i} className={styles.item}>
                    <div className={styles.itemHeader}>
                      <h3 className={styles.itemTitle}>{c.name}</h3>
                      <span className={styles.itemPeriod}>{c.period}</span>
                    </div>
                    <div className={styles.itemDescription}>
                      {c.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.rightColumn}>
            {/* 경력 */}
            {resume.careers.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>경력</h2>
                <div className={styles.timeline}>
                  {resume.careers.map((c, i) => (
                    <div key={i} className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>{c.role}</h3>
                          <span className={styles.itemPeriod}>{c.period}</span>
                        </div>
                        <div className={styles.itemSubtitle}>@{c.company}</div>
                        <div className={styles.itemDescription}>
                          {c.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* 프로젝트 */}
            {resume.projects.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>프로젝트</h2>
                <div className={styles.timeline}>
                  {resume.projects.map((p, i) => (
                    <div key={i} className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.itemHeader}>
                          <h3 className={styles.itemTitle}>{p.name}</h3>
                          <span className={styles.itemPeriod}>{p.period}</span>
                        </div>
                        <div className={styles.itemSubtitle}>{p.role}</div>
                        <div className={styles.itemDescription}>
                          {p.description}
                        </div>
                        {p.honor && (
                          <div className={styles.itemHonor}>{p.honor}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
