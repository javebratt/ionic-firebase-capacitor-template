# Ionic, Angular, Capacitor, and Firebase Template

This is a starter templates for projects using Ionic, Angular, Capacitor, and Firebase.

It covers the building block of most applications.

## Description

This will be a template that will showcase multiple use-cases that help you build your next mobile app, either if you want to check out the code for help or inspiration, or download it and modify it to suit your needs.

It will cover a fully working authentication system, interaction with the database, upload/download files from storage, accessing native device functionality, and more.

> TODO: Add pictures of the pages once things are a bit more complete.

## Getting Started

> TODO: Add getting started once the authentication module is completed.

### Dependencies

The idea is to showcase Ionic, Angular, AngularFire, Capacitor, and rxjs. I'll add here the list and versions once the first module is completed.

> TODO: List the main dependencies here and the version I'll use in the project.

### Installing

TODO: Expand on this:

- Clone, Fork, Download this repo.
- Run `npm install`.
- Inside `environment.ts` and `environment.prod.ts` replace the Firebase credentials.
- Inside `.firebaserc` replace the items for your firebase application:

```json
{
  "targets": {
    "js-mobile-dev-templates": {
      "hosting": {
        "app": ["javebratt-ionic-firebase-template"]
      }
    }
  },
  "projects": {
    "default": "js-mobile-dev-templates"
  }
}
```

### Executing program

Once you've changed your firebase information you'll be able to run the template with either ionic's or angular's CLI `serve` command.

```sh
ionic serve
```

## Roadmap

The goal for this template is to have most of the things an application will have, this is the current roadmap and the showcase of the progress.

If there are items you'd like added or prioritized let me know, you can open an issue adding the `enhancement` label.

- [x] Firebase Initialization and Configuration.
- [ ] Authentication.
  - [ ] Auth page with login/signup form.
  - [ ] Add buttons for social login.
  - [x] Separate the auth functions to a service.
  - [x] Add send email verification to the signup form.
  - [ ] Check the Firebase Authentication Functions to add security checks (_For example, only verified emails can log in_).
  - [ ] Add unit tests
- [ ] CRUD (_using Firestore_).
  - [ ] Master/Detail: A list page with a detail page.
  - [ ] Check if I should add an update page or use the detail page as an update?
  - [ ] Add the ability to delete an item from the list (_Using sliding list items_)
  - [ ] Add the ability to delete an item from the item's detail page.
  - [ ] Explore the posibility of adding filters to demo querying capabilities..
  - [ ] Add unit tests
- [ ] Storage (_managing files in the cloud_).
  - [ ] Create a page to upload file.
  - [ ] Add another place to upload a picture with the capacitor camera.
  - [ ] Add a place to list the files the user has uploaded.
  - [ ] Add functionality to delete a file from storage.
  - [ ] Add unit tests
- [ ] Cloud Functions.
  - [ ] Add a cloud functions that deletes the firestore record for a file when you delete the file from storage.
  - [ ] Add a Cloud Function that deletes a file from storage when you delete that file's firestore record.
  - [ ] Add a cloud function that deletes all the information about a user when the user is deleted.
  - [ ] Create a function to send push notifications to a user.
  - [ ] Create a function to send push notifications to a bunch of users. (_This can be the same as before taking on parameters_).
  - [ ] Add unit tests
- [ ] Firebase Hosting.
  - [ ] Prepare all the hosting configuration.
  - [ ] Prepare the docs to let the user know what they need to modify.
- [ ] Push Notifications.
  - [ ] Set up the device to receive push notifications with capacitor.

## Authors

Hi, I'm Jorge Vergara, If there's anything I can do to help you with let me know, you can reach me via Twitter at [@javebratt](https://twitter.com/javebratt).

## Changelog

In the future I'll list the latest change here, and with each release I'll add a more detailed version of the changelog at [CHANGELOG.md](/CHANGELOG.md)

## License

Distributed under the MIT License. See [LICENSE.txt](/LICENSE.txt) for more information.
