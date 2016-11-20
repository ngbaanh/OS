$.validator.addMethod('maxStrict', function (data, el, param) {
    return data < param;
});
$(function(){
    $('#reset').click(function(){
        if ($('#chooseFile').val() != ''){
            $('#chooseFile').val('');
        }
    });
    $('#chooseFile').bind('change', function(){
        if (this.files[0].size/1024/1024 > 100){
            alert('File size must less than 100MB');
            $('#chooseFile').val('');
        } else {
            var filename = $(this).val().split('\\').pop();
            var extension = filename.split('.')[1];
            if (extension === 'mp4' || extension === 'mov' || extension === 'wmv') {

            } else {
                alert('You need to upload a video');
                $('#chooseFile').val('');
            }
        }
    });
    $('#form-upload-file').validate({
        rules: {
            chooseFile: 'required'
        }, 
        messages: {
            chooseFile: "Please choose file to use"
        },
        ignore: ':hidden:not("#fileSize, #fileType")',
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest(".form-group").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest(".form-group").removeClass("has-error");
        }
    });
    $('#studentList').DataTable({
        lengthChange: false,
        pageLength: 50,
        processing: true,
        serverSide: true,
        searching: false,
        "scrollX": true,
        "info": false,
        "autoWidth": true, 
        ajax: {
            url: '/tableStudent',
            type: 'POST'
        },
        columns: [
            {data: 'student_ID'},
            {data: 'student_name'},
            {data: 'date'},
            {data: 'class'}
        ]
    });
});