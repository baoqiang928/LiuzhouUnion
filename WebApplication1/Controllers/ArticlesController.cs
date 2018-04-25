using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using Model;

namespace MvcApplication1.Controllers
{
    public class ArticlesController : ApiController
    {
        // GET api/Articles/5
        public ArticleInfo Get(string id)
        {
            return new ArticleLogic().GetByID(id);
        }

        // GET api/Articles
        public object Get([FromUri]string DicID,string Title, int currentPage, int itemsPerPage)
        {
            int TotalItems = 0;
            int PagesLength = 0;
            List<ArticleInfo> ArticleInfoList = new ArticleLogic().Query(DicID,Title, currentPage, itemsPerPage, ref TotalItems,ref PagesLength);
            return new
            {
                TotalItems = TotalItems,
                PagesLength = PagesLength,
                Results = ArticleInfoList
            };
        }

        // POST api/Articles
        public int Post([FromBody]ArticleInfo ArticleInfo)
        {
            return new ArticleLogic().SaveArticle(ArticleInfo);
        }

        public int Put([FromBody]ArticleInfo ArticleInfo)
        {
            return new ArticleLogic().SaveArticle(ArticleInfo);
        }

        // DELETE api/Articles/5
        public void Delete(int id)
        {
            new ArticleLogic().DeleteArticle(id);
        }

        // DELETE api/Articles/5
        public void Delete(string ids)
        {
            new ArticleLogic().DeleteArticle(ids);
        }

    }
}


