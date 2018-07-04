using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace LiuZUnion.pages
{
    public partial class upload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            HttpDownloadFile("https://mmbiz.qpic.cn/mmbiz_jpg/Y4gWQKOhMvYLiby0icQUEUmWnJeLYriaxlu14ibRI164aEgxD12AicUKD9IGbWia46icwWHdiaPqDAdIhYlG6El2Y4bdgQ/640?wx_fmt=jpeg", "d:\\aaa\a.webp");
        }
        public string HttpDownloadFile(string url, string path)
        {
            HttpWebRequest Request = WebRequest.Create(url) as HttpWebRequest;

            //WebProxy WebProxy = new WebProxy();
            //Uri NewUri = new Uri("http://" + proxyUrl + ":" + proxyPort);
            //WebProxy.Address = NewUri;
            //WebProxy.Credentials = new NetworkCredential(proxyAccount, proxyPassword);
            Request.UseDefaultCredentials = true;
            //Request.Proxy = WebProxy;

            HttpWebResponse Response = Request.GetResponse() as HttpWebResponse;
            Stream ResponseStream = Response.GetResponseStream();
            //path = HttpContext.Current.Server.MapPath(path);

            Stream stream = new FileStream(path, FileMode.Create);

            byte[] bArr = new byte[1024];
            int size = ResponseStream.Read(bArr, 0, (int)bArr.Length);
            while (size > 0)
            {
                stream.Write(bArr, 0, size);
                size = ResponseStream.Read(bArr, 0, (int)bArr.Length);
            }
            stream.Close();
            ResponseStream.Close();
            return path;
        }
    }
}