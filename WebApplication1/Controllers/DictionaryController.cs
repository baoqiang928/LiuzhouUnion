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
    public class DictionaryController : ApiController
    {
        // GET api/DictionaryTrees/5
        //public DictionaryTreeInfo Get(string id)
        //{
        //return new DictionaryTreeLogic().GetByID(id);
        //}

        public object Get([FromUri]string ids)
        {
            List<DictionaryTreeInfo> DictionaryList = new List<DictionaryTreeInfo>();
            for (int i = 0; i < ids.Split('^').Length; i++)
            {
                if (string.IsNullOrWhiteSpace(ids.Split('^')[i])) continue;
                DictionaryList.Add(new DictionaryTreeLogic().GetByID(ids.Split('^')[i]));
            }
            return DictionaryList;
        }

        public object Get([FromUri]string DicID, string Title, int currentPage, int itemsPerPage)
        {
            int TotalItems = 0;
            int PagesLength = 0;
            List<ArticleInfo> ArticleInfoList = new ArticleLogic().Query(DicID, Title, null, currentPage, itemsPerPage, ref TotalItems, ref PagesLength);
            return new
            {
                TotalItems = TotalItems,
                PagesLength = PagesLength,
                Results = ArticleInfoList
            };
        }

    }
}


