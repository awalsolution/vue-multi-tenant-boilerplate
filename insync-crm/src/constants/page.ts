import type { PageModel } from '@/types'

/**
 * Pagination model
 * @description Basic parameters for pagination query
 */
export class BasePageModel {
  /**
   * current page number
   */
  page: number

  /**
   * Number of items per page
   */
  pageSize: number

  /**
   * search text
   */
  searchText?: string

  /**
   * start date
   */
  startDate?: string

  /**
   * end date
   */
  endDate?: string

  /**
   * sort key
   * @description separated by commas
   */
  sort?: string

  /**
   * sort order
   * @description separated by commas
   */
  order?: string

  constructor(pageModel?: PageModel) {
    const { page, pageSize, searchText, startDate, endDate, sorters } = pageModel ?? {}
    this.page = page ?? 1
    this.pageSize = pageSize ?? 10
    if (searchText) {
      this.searchText = searchText
    }
    if (startDate) {
      this.startDate = startDate
    }
    if (endDate) {
      this.endDate = endDate
    }
    if (sorters && Array.isArray(sorters) && sorters.length > 0) {
      const sorterKeys = sorters.map((sorter) => sorter.key)
      this.sort = sorterKeys.join()
      const sorterOrders = sorters.map((sorter) => sorter.order)
      this.order = sorterOrders.join()
    }
  }
}
