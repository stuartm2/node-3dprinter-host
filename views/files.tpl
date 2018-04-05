
<div class="card bg-light">
    <div class="card-body">
        <button class="btn btn-default" data-toggle="modal" data-target="#fileUploadDialog">Upload File</button>
    </div>
</div>

<br>

<table class="table table-sm table-hover" id="filesTable">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th class="text-right">Size</th>
            <th><br></th>
        </tr>
    </thead>
    <tbody>
        {{#each files}}
            {{>filerow}}
        {{/each}}
    </tbody>
</table>

<div class="modal" tabindex="-1" role="dialog" id="fileUploadDialog">
    <div class="modal-dialog" role="document">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p><input type="file" class="form-control-file" id="fileUploadInput"></p>

                <div class="alert alert-danger alert-file-type" role="alert">
                    Only .gcode files can be uploaded
                </div>

                <div class="alert alert-danger alert-upload-error" role="alert">
                    There was a problem uploading your file
                </div>

                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Upload" id="fileUploadSubmitBtn">
            </div>
        </form>
    </div>
</div>
