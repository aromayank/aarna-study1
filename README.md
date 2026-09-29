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
7. Build and test the Cordova iPhone app on a Mac with Xcode before App Store submission.

## Publishing path

- Website: deploy to Vercel with a GitHub repository and a production build.
- iPhone app: the Cordova wrapper packages the static Next.js export, with native iOS text-to-speech for spelling practice. Progress remains on-device in local storage.

## iOS build

Use a Mac with the Xcode version currently accepted by App Store Connect (Cordova iOS 8.1.1 requires Xcode 15 or newer), its command-line tools, Node.js 20.17 or newer, CocoaPods 1.16 or newer, and ios-deploy 1.12.2 or newer. The app targets iOS 13 and newer.

1. Clone the repository and run `npm ci`.
2. Run `npm run ios:setup` once to add the pinned Cordova iOS platform and install the declared native plugins.
3. Run `npm run ios:build` to create the Next.js static export, copy it into Cordova's `www/` folder, and build the iOS project.
4. Run `npm run ios:open` to build and open `platforms/ios/App.xcworkspace` in Xcode. Select a simulator or signed device and press Run.
5. Before distribution, replace the sample bundle identifier in `config.xml`, review the launch screen, set the Apple Development Team and signing, and complete App Store Connect privacy and age-rating details.

The `www/`, `platforms/`, `plugins/`, and `.cordova/` directories are generated and intentionally not committed. `cordova-plugin-tts` speaks spelling words using iOS text-to-speech; no microphone permission is needed. Browser speech synthesis remains the fallback when running the Vercel website.

This setup makes the project buildable as a Cordova iOS app, but does not guarantee App Store approval. Final readiness still depends on a successful signed archive, real-device testing, Apple policy compliance, and review.

## Parent tracking and monitoring

- The current progress report is a local-device prototype, not a parent login or school report.
- Use consent-based access, secure authentication, and server-side access controls before storing student records.
- Review data handling and the published curriculum with the school and parent before launch.
