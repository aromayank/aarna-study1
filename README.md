# Aarna Study

This project is a responsive seventh-grade study website for a Jonas Salk Middle School learner. The curriculum map is based on the grade-seven district PDFs in `curriculum/`; matching copies in `public/curriculum/` are served by the website.

## Project goals

- Responsive website that works well on phones, tablets, and desktops.
- Shared curriculum logic that can be reused in a future native iPhone app wrapper.
- Four marking-period views across ELA, Math, Science, and Social Studies.
- Randomized 60-question activity banks per module for practice, assignments, assessments, and quizzes.
- Marking-period spelling lists at easy, medium, and hard levels, with listen-and-spell rounds.
- A parent progress view with activity totals, scores, assignment submissions, and recent results.
- Progress is stored in this browser only. It does not sync across devices and is not a secure parent account.
- Direct access to the supplied ELA, honors ELA, honors Math, Science, Social Studies, and G.L.O.B.E. curriculum guides.

## Suggested next steps

1. Install Node.js and npm locally.
2. Run `npm install` in this folder.
3. Start the app with `npm run dev`.
4. Review the mapped unit order with the student's teachers, especially course placement for Math.
5. Have a Grade 7 teacher review generated questions and spelling lists for correctness and curriculum fit before public launch.
6. Add private student/parent accounts and server-side progress storage before enabling cross-device monitoring or calling the parent view a secure report.
7. Build and test the iPhone app after website content and account model are stable.

## Publishing path

- Website: deploy to Vercel with a GitHub repository and a production build.
- iPhone app: reuse the TypeScript curriculum with Expo or build a native client, then use Xcode and App Store Connect for signing, privacy disclosures, and review.

## Parent tracking and monitoring

- The current progress report is a local-device prototype, not a parent login or school report.
- Use consent-based access, secure authentication, and server-side access controls before storing student records.
- Review data handling and the published curriculum with the school and parent before launch.
