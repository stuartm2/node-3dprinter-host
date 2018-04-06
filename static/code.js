
/*
 * File uploader from https://stackoverflow.com/a/10811427
 * Thanks to Stackoverflow user Ziinloader
 */

var Upload = function (file) {
    this.file = file;
};

Upload.prototype.getType = function() {
    return this.file.type;
};

Upload.prototype.getSize = function() {
    return this.file.size;
};

Upload.prototype.getName = function() {
    return this.file.name;
};

Upload.prototype.doUpload = function (params) {
    var that = this;
    var formData = new FormData();

    params = $.extend({
        success: function (data) {},
        error: function (err) {},
        progress: function (percent) {}
    }, params);

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);

    $.ajax({
        type: "POST",
        url: "/files",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', (event) => {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    params.progress(percent);
                }, false);
            }
            return myXhr;
        },
        success: params.success,
        error: params.error,
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};

function onDeleteBtnClicked(e) {
    e.preventDefault();
    var filename = $(e.target).data('filename');

    if (confirm(`Are you sure you want to delete ${filename}?`)) {
        $.ajax({
            url: `/files/${filename}`,
            type: 'DELETE',
            success: (result) => {
                var $row = $(this).parents('tr');
                $row.fadeOut({
                    complete: $row.remove
                });
            },
            error: () => console.log(`There was a problem deleting ${filename}`)
        });
    }
}

function onPrintBtnClicked(e) {
    e.preventDefault();
    var filename = $(e.target).data('filename');

    $.post({
        url: `/files/${filename}/print`,
        data: {},
        success: (result) => {},
        error: () => console.log(`There was a problem printing ${filename}`)
    });
}

function onFileUploadDialogShown() {
    $(this).find('.progress').hide();
    $(this).find('.alert').hide();
    $('#fileUploadSubmitBtn').prop('disabled', true);
}

function onFileUploadInputChanged() {
    var $submitBtn = $('#fileUploadSubmitBtn');

    $('#fileUploadDialog').find('.alert').hide();

    if (isGCodeFile(this.value)) {
        $submitBtn.prop('disabled', false);
    } else {
        $('#fileUploadDialog').find('.alert-file-type').show();
        $submitBtn.prop('disabled', true);
    }
}

function onFileUploadFormSubmit() {
    var file = $(this).find('#fileUploadInput')[0].files[0];

    $(this).find('.alert').hide();

    if (file && isGCodeFile(file.name)) {
        $(this).find('.progress').show();
        var upload = new Upload(file);
        upload.doUpload({
            success: (data) => {
                $('#fileUploadDialog').modal('hide');
                $(this).find('.progress').hide();
                $.get({
                    url: '/files/' + encodeURIComponent(data.name) + '/row',
                    success: (row) => addItemToTable(data, row)
                });
            },
            error: (err) => $(this).find('.alert-upload-error').show(),
            progress: (percent) => $(this).find('.progress-bar').width(percent + '%')
        });
    } else {
        $(this).find('.alert-file-type').show();
    }

    return false;
}

function addItemToTable(item, row) {
    var added = false;

    $(row).hide();

    $('#filesTable tbody tr').each(function () {
        var rowItemName = $(this).children().eq(0).text();

        if (!added && rowItemName > item.name) {
            $(this).before($(row));
            added = true;
        }
    });

    if (!added) {
        $('#filesTable tbody').append($(row));
    }

    $(row).fadeIn();
    initFilesTable();

    return false;
}

function initFilesTable() {
    $('#filesTable .btn-delete')
        .unbind('click')
        .click(onDeleteBtnClicked);
    $('#filesTable .btn-print')
        .unbind('click')
        .click(onPrintBtnClicked);
}

function initFileUploadDialog() {
    $('#fileUploadDialog').on('shown.bs.modal', onFileUploadDialogShown);
    $('#fileUploadInput').change(onFileUploadInputChanged);
    $('#fileUploadDialog form').submit(onFileUploadFormSubmit);
}

$(document).ready(() => {
    initFilesTable();
    initFileUploadDialog();
});
