---
title: Updating the Web SDK version
layout: redirect
weight: 0
---

From version 1019.x.x onwards the Web SDK is following semantic versioning. Meaning that every major version bump (for example, from 1019 to 1020) may contain breaking changes, but every minor or fix bump should not break your application. So it is safe to update to any minor or fix version, but if you update to any major version, you might need to migrate things.
 
Easiest way for migration at the moment is still comparing the diff with [git](https://git-scm.com).

### Preparation {#preparation}

We recommend you to use a Source Control System to backup the data and to get better diffing of the code.
If you are not using an SCM yet, see below for an introduction on how to use [git](https://git-scm.com) to store your changes.
If you are already using an SCM or you don't want to use any, you can jump to the next section.
If you decide not to use an SCM, backup your application before running the update.

Ensure that you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your system.
Then open a terminal and run the following commands:

```shell
cd <<path/to-you-app>>
git init
git add .
git commit -m "init commit"
```

Now your code is committed to a local git repository stored in the `.git` folder.
Next this recipe explains you how to update the Web SDK.
If you don't want to use git anymore after the update, you can simply erase the `.git` folder.

### Updating {#updating}

To update the Web SDK you must create a new application with the desired version and copy over the files. The diff then tells you, where merge conflicts might happen. Fix any merge conflicts prior to merging.

```shell
ng new cockpit
cd cockpit
ng add @c8y/websdk 
```

If you select a newer version of the application you want to scaffold, you get the latest scaffolding files. If you copy them over to your solution which was checked in before, you can see the difference between the versions.

### Diffing to reapply changes {#diffing-to-reapply-changes}

A git diffing tool is useful to identify which changes have been made with the upgrade and which have been made earlier and now must be reapplied.
In the following screenshot we are using [Visual Studio Code](https://code.visualstudio.com/) to identify the changes, as it has a well integrated diffing tool for git (mostly all other IDEs have support for git diffing as well):

![Comparing the difference with vscode](/images/web-sdk/update-diff.png)

With that tool it is easy to compare which file was changed with the upgrade and where custom changes may have to be reapplied.
In this case `MyCustomModule` must only be placed in the upgrade `app.module.ts`.
When this change is done, the update can be verified.

### Verifying the update {#verifying-the-update}

To check if the version update worked, it is usually a good practice to run it locally first.
Therefore, you need first to install the dependencies again.
Remove the current `node_modules` directory and run `npm install` (or `yarn`) again to refresh the dependencies.
After this, start the application with `npm start`. After login you can check the current UI version by clicking on you username.

If everything worked as expected, you can now deploy your application by running the command`npm run deploy`.

### Conclusion {#conclusion}

The update process is sometimes a bit tricky, especially if you have many changes in the `app.module.ts`.
However, with git and Visual Studio Code the visual diffing may help you to accomplish this task.
Also, it is a good practice to put your own Angular customizations into a module and only to make changes to the `app.module.ts` when it is absolutely necessary.
