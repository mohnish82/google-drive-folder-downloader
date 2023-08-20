# Google public folder downloader
Downloads a publicly shared Google Drive folder as a Zip bundle.

## Overview
Runs a [Cypress](https://www.cypress.io/) test specification to automate the browser to perform the following steps.

* Visit the Google Drive shared folder page.
* Click the `Download all` link and wait for Google Drive to prepare the Zip file link.
* Downloads and tracks the progress of the file download(s), stops after the file(s) have downloaded.

Note:
> For big folders, Google Drive prepares multiple Zip files. This service downloads all of them.

## Usage
Workflow is Docker based, so either utilize the full image prepared by the Cypress team (convenient, but big image) or build a custom image, usign the provided Dockerfile and execute it (smaller image size).

The service requires the Google Drive folder Id. The folder Id is part of the shared URL. E.g.

> Shared URL: https://drive.google.com/drive/folders/28sjdTTTjsvsz1TTKdfasd?usp=sharing  
> Folder Id -> 28sjdTTTjsvsz1TTKdfasd

Also, an optional variable `max_download_time_seconds`, can be passed to increase the total run time beyond the default 30 mins, if downloading big files on a slow network. The service ends as soon as the download is complete OR terminates if this max time limit is reached (default: 30 mins).

### Single command Docker run
A convenient option is to utilize the full bundled image prepared by the Cypress team, with Cypress and browsers pre-installed. The image is available on [Docker Hub](https://hub.docker.com/r/cypress/included). The image size is 1.5 - 2 GB.

Executing the following from project root, should download and place the Zip file(s) in the `cypress/downloads` folder.
```sh
$ docker run --rm \
    -v $(pwd):/e2e \
    -w /e2e \
    -e CYPRESS_drive_folder_id=XXX \
    -e CYPRESS_max_download_time_secs=1800 \
    cypress/included
```

### Application container
A Dockerfile is included in the project to build a container image. This build installs no browsers, but utilizes Electron. The following command can be used to build the image.

```sh
$ docker build -t localhost/google-drive-dwnldr .
```

And the built image can then be executed as follows. Remember to mount the folder where you want the Zip file downloaded.

```sh
$ docker run --rm \
    -v $(pwd)/cypress/downloads:/app/cypress/downloads \
    localhost/google-drive-dwnldr run --env drive_folder_id=28sjdTTTjsvsz1TTKdfasd
```
