$.validator.addMethod('maxStrict', function (data, el, param) {
    return data < param;
});
//$.validator.addMethod('fileType', function(data, el, param){
//    return (data === 'mp4') || (data === 'mov') || (data === 'wmv');
//});
$(function(){
    $('#reset').click(function(){
        if ($('#chooseFile').val() != ''){
            $('#chooseFile').val('');
        }
    });
    $('#chooseFile').bind('change', function(){
        $('#fileSize').val(this.files[0].size/1024/1024);
        var filename = $(this).val().split('\\').pop();
        var extension = filename.split('.')[1];
        if (extension === 'mp4' || extension === 'mov' || extension === 'wmv') {
            
        } else {
            alert('You need to upload a video');
            $('#chooseFile').val('');
        }
    });
    $('#form-upload-file').validate({
        rules: {
            chooseFile: 'required',
            fileSize: {
                maxStrict: 100
            },
            //fileType: 'fileType'
        }, 
        messages: {
            chooseFile: "Please choose file to use",
            fileSize: {
                maxStrict: "File size must less than 100MB"
            },
            //fileType: "You need to upload a video"
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
});