using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    /// <summary>
    /// FileUploadHandler 的摘要说明
    /// </summary>
    public class FileUploadHandler : IHttpHandler
    {

        private const string UPLOAD_RESOURCES_FOLDER_NAME = "UploadResources";
        public void ProcessRequest(HttpContext context)
        {
            foreach (string fname in context.Request.Files.AllKeys)
            {
                string guidFileName = Guid.NewGuid().ToString();
                HttpPostedFile file = context.Request.Files[fname];
                file.SaveAs(context.Server.MapPath("~/" + UPLOAD_RESOURCES_FOLDER_NAME) +
                            "//" + file.FileName);
                Uri addressUri = context.Request.Url;
                string httpFilePath = string.Format("{0}://{1}/{2}/{3}",
                                                    addressUri.Scheme,
                                                    addressUri.Authority,
                                                    UPLOAD_RESOURCES_FOLDER_NAME,
                                                    guidFileName + file.FileName);
                context.Response.Write(httpFilePath);
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}