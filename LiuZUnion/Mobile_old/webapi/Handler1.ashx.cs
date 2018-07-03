using System.Web;
using System.Web.Script.Serialization;
using Model;
using System.IO;
using BLL;
using ThoughtWorks.QRCode.Codec;
using System;
using System.Web.SessionState;

namespace Pre_Registration.MembershipReg.webapi
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler1 : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                //Com.Alipay.Core.LogResult("test");
                string Action = context.Request["action"];
                if (Action == "InsertVisitor")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(InsertVisitor(context));
                    return;
                }
                if (Action == "InsertHotel")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(InsertHotel(context));
                    return;
                }
                if (Action == "InsertMeeting")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(InsertMeeting(context));
                    return;
                }
                if (Action == "InsertInvoice")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(InsertInvoice(context));
                    return;
                }
                if (Action == "GetSuccessMessage")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(GetSuccessMessage(context));
                    return;
                }
                if (Action == "GetVisitor")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(GetVisitor(context));
                    return;
                }
                if (Action == "GetInvoice")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(GetInvoice(context));
                    return;
                }
                if (Action == "GetQRCode")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(GetQRCode(context));
                    return;
                }
                if (Action == "GetHotelCount")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(GetHotelCount(context));
                    return;
                }
                if (Action == "SendEmailAfterRegist14")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(SendEmailAfterRegist(context, "14"));
                    return;
                }
                if (Action == "SendEmailAfterRegist2")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(SendEmailAfterRegist(context, "2"));
                    return;
                }
                if (Action == "SendSMS")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(SendSMS(context));
                    return;
                }



                if (Action == "SendValidCode")
                {
                    context.Response.ContentType = "text/plain";
                    context.Response.Write(SendValidCode(context));
                    return;
                }

                context.Response.ContentType = "text/plain";
                context.Response.Write("");
            }
            catch (Exception e)
            {
                Com.Alipay.Core.LogResult(e.Message);
            }
        }

        private string GetQRCode(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                QRCode QRCode = new QRCode();
                QRCode.PicPath = new Pre_Registration.Reg.RegSuccessCn().GetQRCodeUrl1(NewVisitorInfo.Code + "|" + NewVisitorInfo.CompanyName + "|" + NewVisitorInfo.RealName + "|" + NewVisitorInfo.CellPhone + "|" + NewVisitorInfo.Email);
                string objInJson = serializer.Serialize(QRCode);
                return objInJson;
            }
            return "";
        }
        public class QRCode
        {
            public string PicPath = "";
        }

        private string GetInvoice(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                InvoiceInfo InvoiceInfo = serializer.Deserialize<InvoiceInfo>(json);
                InvoiceInfo = new Invoice().GetObjectByVisitorID(InvoiceInfo.VisitorID);
                string objInJson = serializer.Serialize(InvoiceInfo);
                return objInJson;
            }
            return "";
        }

        private string GetHotelCount(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                return new NewVisitor().GetHotelCountByType(json);
            }
            return "0";
        }
        private string GetVisitor(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                NewVisitorInfo = new NewVisitor().GetVisitorByMobile(NewVisitorInfo.ExhiID.ToString(), NewVisitorInfo.CellPhone);
                string objInJson = serializer.Serialize(NewVisitorInfo);
                return objInJson;
            }
            return "";
        }
        public class info
        {
            public string msg { get; set; }
        }
        private string SendValidCode(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                Random r = new Random();
                int cde = r.Next(100000, 999999);
                string code = cde.ToString();
                new BLL.MobileValidate().Insert(NewVisitorInfo.CellPhone, ref code);
                string nr = "预登记短信验证码：{0}，请准确填写6位验证码，完成注册！验证码有效时长5分钟【中铸协】";
                string res = "";
                new Pre_Registration.Reg.RegSuccessCn().PostData("rongyaoshidai", "123456", NewVisitorInfo.CellPhone, String.Format(nr, code), ref res);
                string jsoncallback = context.Request.QueryString.Get("jsoncallback");
                string Jsondata = ToJSON(new info() { msg = "发送成功，请耐心等候短信，本次验证码5分钟有效！" });
                //string objInJson = serializer.Serialize(NewVisitorInfo);
                return jsoncallback + "" + Jsondata + "";
                //return objInJson;
            }
            return "";
        }

        private string SendSMS(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                string nr = "【中铸协】代表您好！您已完成2018中铸协年会注册第一步。我们向您注册邮箱发送参会说明及付费邮件，请您查收并仔细阅读。";
                string res = "";
                new Pre_Registration.Reg.RegSuccessCn().PostData("rongyaoshidai", "123456", NewVisitorInfo.CellPhone, nr, ref res);
                string jsoncallback = context.Request.QueryString.Get("jsoncallback");
                string Jsondata = ToJSON(new info() { msg = "发送成功，请耐心等候短信，本次验证码5分钟有效！" });
                //string objInJson = serializer.Serialize(NewVisitorInfo);
                return jsoncallback + "" + Jsondata + "";
                //return objInJson;
            }
            return "";
        }
        private string SendEmailAfterRegist(HttpContext context, string Participate)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                if (Participate == "14")
                {
                    new Pre_Registration.Reg.RegSuccessCn().SendMailByParamName(NewVisitorInfo, "cnEmail", "cnEmailTitle", "2018中铸协会会员大会暨年会会务组");
                }
                else
                {
                    new Pre_Registration.Reg.RegSuccessCn().SendMailByParamName(NewVisitorInfo, "egEmail", "egEmailTitle", "2018中铸协论坛会务组");
                }
                string objInJson = serializer.Serialize(NewVisitorInfo);
                return objInJson;
            }
            return "";
        }

        private string GetSuccessMessage(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                VisCommonCfgInfo VisCommonCfgInfo = new VisCommonCfgInfo();
                //if (NewVisitorInfo.Title == "14")
                //{
                //    VisCommonCfgInfo = new VisitorConfig().GetCommonConfigInfoByType(NewVisitorInfo.ExhiID.ToString(), "RegSuccessCn");
                //}
                //if (NewVisitorInfo.Title == "2")
                //{
                VisCommonCfgInfo = new VisitorConfig().GetCommonConfigInfoByType(NewVisitorInfo.ExhiID.ToString(), "RegSuccessEg");
                //}

                string objInJson = serializer.Serialize(VisCommonCfgInfo);
                return objInJson;
            }
            return "";
        }

        private string InsertVisitor(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                //判断观众类型
                NewVisitorInfo.Department = new MembershipIdentiy().GetName(NewVisitorInfo.RealName);
                if (NewVisitorInfo.Department == "")
                {
                    NewVisitorInfo.Department = new MembershipIdentiy().GetName(NewVisitorInfo.CompanyName);
                }

                if (new NewVisitor().IsExistMobile(NewVisitorInfo))
                {
                    NewVisitorInfo.RealName = "手机号码重复";
                }
                else
                {

                    if (!new BLL.MobileValidate().Validate(NewVisitorInfo.CellPhone, NewVisitorInfo.PostCode))
                    {
                        NewVisitorInfo.RealName = "请输入正确验证码";
                    }
                    else
                    {
                        new NewVisitor().Insert(NewVisitorInfo, "MobileCn");
                    }
                }

                string objInJson = serializer.Serialize(NewVisitorInfo);
                return objInJson;
            }
            return "";
        }
        private string InsertMeeting(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                new NewVisitor().InsertMeetingAmount(NewVisitorInfo.ID, NewVisitorInfo.MeetingAmount, NewVisitorInfo.GFFAmount, NewVisitorInfo.Fax);
                string objInJson = serializer.Serialize(NewVisitorInfo);
                return objInJson;
            }
            return "";
        }
        private string InsertHotel(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                NewVisitorInfo NewVisitorInfo = serializer.Deserialize<NewVisitorInfo>(json);
                new NewVisitor().InsertDays(NewVisitorInfo);
                string objInJson = serializer.Serialize(NewVisitorInfo);
                return objInJson;
            }
            return "";
        }
        private string InsertInvoice(HttpContext context)
        {
            HttpRequest request = context.Request;
            Stream stream = request.InputStream;
            string json = string.Empty;
            string responseJson = string.Empty;
            if (stream.Length != 0)
            {
                StreamReader streamReader = new StreamReader(stream);
                json = streamReader.ReadToEnd();
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                InvoiceInfo InvoiceInfo = serializer.Deserialize<InvoiceInfo>(json);
                new Invoice().Insert(InvoiceInfo);
                string objInJson = serializer.Serialize(InvoiceInfo);
                return objInJson;
            }
            return "";
        }

        /// <summary>
        /// 序列化
        /// </summary>
        /// <param name="obj">数据对象</param>
        /// <returns>序列化成果</returns>
        public static string ToJSON(object obj)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(obj);
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