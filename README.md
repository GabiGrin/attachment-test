# Browser File Download Tester
The [internet](https://stackoverflow.com/questions/3802510/force-to-open-save-as-popup-open-at-text-link-click-for-pdf-in-html) is [full](https://stackoverflow.com/questions/2598658/how-to-force-a-pdf-download-automatically) of [answers](https://www.quora.com/How-do-you-create-a-download-link-to-a-file-in-your-html-folder-in-html) to the question of "how to force the browser to download a file".

This is a small app to test combinations of file types, `download` attribute and the [Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) header.

## Running
1. `npm i && npm start`
2. Browse to `http://localhost:8080`

## Findings

1. When the asset is in the same origin the `download` attribute is respected regardless of file type.
2. When the asset is not in the same origin, the `download` attribute is ignored for files that type browser can display (in this case .txt, .png, .log, but not .zip)
3. #2 applies even when there is a redirect from the same origin to another one (i.e. in the case of redirecting to a CDN)
4. `Content-Disposition: attachment` header seems to force the browser to download all files when the `download` attribute is *not* present! 

## Conclusion
For Chrome 72, but might apply to other browsers as well, the best way to get the browser to force download a file is by using the Content-Disposition header.
If the file is under the same origin, but *without* redirects, the `download` attribute will work as well







