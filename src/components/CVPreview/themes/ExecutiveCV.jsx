import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const col = {
  charcoal: "#2c2c2c",
  gold: "#b8860b",
  goldLight: "#fdf8ec",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  light: "#888",
  border: "#e0d5b0",
  white: "#fff",
  divider: "#c9a84c",
};

const PROJECTS = ["Energy-X", "DoConnect", "CvGenie"];

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: col.text, backgroundColor: col.white, paddingTop: 32, paddingBottom: 32, paddingHorizontal: 44 },
  headerCenter: { alignItems: "center", marginBottom: 9, paddingBottom: 9, borderBottomWidth: 2, borderBottomColor: col.gold },
  name: { fontSize: 21, fontFamily: "Helvetica-Bold", color: col.charcoal, letterSpacing: 2, marginBottom: 2, textAlign: "center" },
  jobTitle: { fontSize: 10, color: col.gold, fontFamily: "Helvetica-Bold", letterSpacing: 1, textAlign: "center", marginBottom: 5 },
  contactRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap" },
  contactItem: { fontSize: 8, color: col.muted, marginHorizontal: 5 },
  contactSep: { fontSize: 8, color: col.gold },
  link: { fontSize: 8, color: col.gold, marginHorizontal: 5 },
  section: { marginBottom: 8 },
  secTitleWrap: { alignItems: "center", marginBottom: 4 },
  secTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: col.charcoal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 2 },
  secLine: { borderBottomWidth: 0.5, borderBottomColor: col.divider, width: "100%" },
  entry: { marginBottom: 6 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  entryTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: col.charcoal, flex: 1 },
  entryPeriod: { fontSize: 7.5, color: col.light, fontFamily: "Helvetica-Oblique", flexShrink: 0, marginLeft: 6 },
  entrySubtitle: { fontSize: 8, color: col.gold, fontFamily: "Helvetica-Bold", marginBottom: 1.5 },
  entryMeta: { fontSize: 7.5, color: col.light },
  entryDesc: { fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 },
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 5 },
  dot: { fontSize: 8, color: col.gold, marginRight: 4 },
  bulletText: { fontSize: 8, color: col.muted, flex: 1, lineHeight: 1.35 },
  summary: { fontSize: 8.5, color: col.muted, lineHeight: 1.55, textAlign: "justify" },
  skillCat: { fontSize: 8, fontFamily: "Helvetica-Bold", color: col.charcoal, marginBottom: 2, marginTop: 2 },
  skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  skillTag: { fontSize: 7.5, color: col.charcoal, backgroundColor: col.goldLight, paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 2, borderWidth: 0.5, borderColor: col.border, marginBottom: 2 },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  certTag: { fontSize: 7.5, color: col.muted, backgroundColor: "#f8f8f8", paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 2, borderWidth: 0.5, borderColor: "#e0e0e0", marginBottom: 2 },
});

const Dot = () => <Text style={s.dot}>◆</Text>;

function SecTitle({ children }) {
  return (
    <View style={s.secTitleWrap}>
      <Text style={s.secTitle}>{children}</Text>
      <View style={s.secLine} />
    </View>
  );
}

function ExpEntry({ exp }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{exp.role} — {exp.company}</Text>
        <Text style={s.entryPeriod}>{exp.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{exp.location} · {exp.type}</Text>
      {exp.points.map((p, j) => (
        <View key={j} style={s.bullet}><Dot /><Text style={s.bulletText}>{p}</Text></View>
      ))}
    </View>
  );
}

function EduEntry({ edu }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{edu.degree}</Text>
        <Text style={s.entryPeriod}>{edu.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{edu.institution} · {edu.location}</Text>
      <Text style={s.entryMeta}>Score: {edu.score}{edu.description ? ` — ${edu.description}` : ""}</Text>
    </View>
  );
}

function ProjEntry({ proj }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{proj.title} — {proj.subtitle}</Text>
        <Text style={s.entryPeriod}>{proj.status}</Text>
      </View>
      <Text style={s.entryDesc}>{proj.description}</Text>
      <Text style={s.entryMeta}>Stack: {proj.tags.join(", ")}</Text>
    </View>
  );
}

function VolEntry({ v }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{v.role} · {v.organization}</Text>
        <Text style={s.entryPeriod}>{v.period}</Text>
      </View>
      <Text style={s.entryDesc}>{v.description}</Text>
    </View>
  );
}

export default function ExecutiveCV({ data }) {
  const { personalInfo, experience, education, skillTags, achievements, certifications, projects, volunteer } = data;
  const cvProjects = projects.filter(p => PROJECTS.includes(p.title));

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.headerCenter}>
          <Text style={s.name}>{personalInfo.name.toUpperCase()}</Text>
          <Text style={s.jobTitle}>{personalInfo.title}</Text>
          <View style={s.contactRow}>
            <Text style={s.contactItem}>{personalInfo.email}</Text>
            <Text style={s.contactSep}>|</Text>
            <Text style={s.contactItem}>{personalInfo.phone}</Text>
            <Text style={s.contactSep}>|</Text>
            <Text style={s.contactItem}>{personalInfo.location}</Text>
            <Text style={s.contactSep}>|</Text>
            <Link src={personalInfo.linkedin} style={s.link}>LinkedIn</Link>
            <Text style={s.contactSep}>|</Text>
            <Link src={personalInfo.github} style={s.link}>GitHub</Link>
          </View>
        </View>

        {/* Summary */}
        <View style={s.section} wrap={false}>
          <SecTitle>Executive Summary</SecTitle>
          <Text style={s.summary}>{personalInfo.summary}</Text>
        </View>

        {/* Experience */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Professional Experience</SecTitle>
            <ExpEntry exp={experience[0]} />
          </View>
          {experience.slice(1).map((exp, i) => (
            <View key={i} wrap={false}><ExpEntry exp={exp} /></View>
          ))}
        </View>

        {/* Education */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Education</SecTitle>
            <EduEntry edu={education[0]} />
          </View>
          {education.slice(1).map((edu, i) => (
            <View key={i} wrap={false}><EduEntry edu={edu} /></View>
          ))}
        </View>

        {/* Skills */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Core Competencies</SecTitle>
            {Object.entries(skillTags).slice(0, 1).map(([cat, items]) => (
              <View key={cat}>
                <Text style={s.skillCat}>{cat}</Text>
                <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
              </View>
            ))}
          </View>
          {Object.entries(skillTags).slice(1).map(([cat, items]) => (
            <View key={cat} wrap={false}>
              <Text style={s.skillCat}>{cat}</Text>
              <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Notable Projects</SecTitle>
            <ProjEntry proj={cvProjects[0]} />
          </View>
          {cvProjects.slice(1).map((proj, i) => (
            <View key={i} wrap={false}><ProjEntry proj={proj} /></View>
          ))}
        </View>

        {/* Achievements */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Achievements & Recognition</SecTitle>
            {achievements.slice(0, 2).map((a, i) => (
              <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
            ))}
          </View>
          {achievements.slice(2).map((a, i) => (
            <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
          ))}
        </View>

        {/* Certifications */}
        <View style={s.section} wrap={false}>
          <SecTitle>Certifications</SecTitle>
          <View style={s.certRow}>
            {certifications.map((c, i) => <Text key={i} style={s.certTag}>{c.name} — {c.issuer}</Text>)}
          </View>
        </View>

        {/* Volunteer */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Leadership & Volunteering</SecTitle>
            <VolEntry v={volunteer[0]} />
          </View>
          {volunteer.slice(1).map((v, i) => (
            <View key={i} wrap={false}><VolEntry v={v} /></View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
