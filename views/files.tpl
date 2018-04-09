
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <button class="btn btn-default" data-toggle="modal" data-target="#fileUploadDialog">Upload File</button>
        </li>
    </ul>
    <div>
        <div class="input-group">
            <input type="search" class="form-control" id="filterFld" placeholder="Search">
            <div class="input-group-append">
                <button class="btn input-group-btn" id="filterClearBtn">X</button>
            </div>
        </div>
    </div>
</nav>

<table class="table table-sm table-hover" id="filesTable">
    <thead class="thead-dark">
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th class="text-right">Size</th>
            <th colspan="2"><br></th>
        </tr>
    </thead>
    <tbody>
        {{#each files}}
            {{>filerow}}
        {{/each}}
    </tbody>
    <tfoot>
        <tr>
            <td colspan="5" class="text-center"><em>No files</em></td>
        </tr>
    </tfoot>
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
