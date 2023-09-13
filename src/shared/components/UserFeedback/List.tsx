import { useEffect, useState } from 'react';
import {
  CloseCircleOutlined,
  LeftCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { DeepPartial } from '@enouvo/react-uikit';
import { useTable } from '@enouvo/react-uikit';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Select, Table, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-colour.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-colour.svg';
import { queryClient } from '#/services/client';
import type {
  BaseGetAllResponse,
  QueryParams,
} from '#/services/common/interfaces';
import { QUERY } from '#/services/constants';
import { fetchCountRatings, fetchFeedbacks } from '#/services/feedbacks';
import type { CountRatings, Feedback } from '#/services/feedbacks/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { TAG_MESSAGES } from '#/shared/utils/constant';
import { formatDateByLocalTime } from '#/shared/utils/date';
import { truncateText } from '#/shared/utils/tools';
import PaginationPanel from '../common/PaginationPanel';
import StatusCard from './components/StatusCard';
import StatusTag from './components/StatusTag';
import { StyledSelect } from './components/styles';
import { useGetSearchParams } from './hooks/useGetSearchParams';
import { StyledModal, TableWrapper } from './styles';

function List() {
  const { t } = useTypeSafeTranslation();
  const { currentPage, setCurrentPage } = useTable();
  const [form] = Form.useForm();
  const [viewAll, setViewAll] = useState(false);
  const [viewAllText, setViewAllText] = useState<string | undefined>('');
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  const { queryString } = useGetSearchParams(queryParams);

  const { data: fetchFeedbacksResponse } = useQuery<
    BaseGetAllResponse<Feedback>
  >({
    queryFn: () => fetchFeedbacks(queryString),
    queryKey: QUERY.getFeedbacks,
  });

  const { data: fetchCountRatingsResponse } = useQuery<CountRatings>(
    QUERY.getCountRatings,
    fetchCountRatings,
  );

  const prefetchFeedbacks = async () => {
    await queryClient.prefetchQuery({
      queryFn: () => fetchFeedbacks(queryString),
      queryKey: QUERY.getFeedbacks,
    });
  };

  const columns = [
    {
      dataIndex: 'created_at',
      key: 'created_at',
      render: (data: string) => formatDateByLocalTime(data),
      title: t('feedback.createdAt'),
      width: 170,
    },
    {
      dataIndex: 'users',
      key: 'users',
      render: (_data: string, record: DeepPartial<Feedback>) =>
        record?.user?.email,
      title: t('feedback.users'),
      width: 230,
    },
    {
      dataIndex: 'questions',
      key: 'questions',
      render: (_data: string, record: DeepPartial<Feedback>) =>
        record?.question?.content,
      title: t('feedback.questions'),
      width: 200,
    },
    {
      dataIndex: 'answer',
      key: 'answer',
      render: (_data: string, record: DeepPartial<Feedback>) => (
        <>
          {truncateText(String(record?.message?.content))}
          <span
            className="ml-1 text-primary-color hover:cursor-pointer"
            onClick={() => {
              setViewAll(true);
              setViewAllText(record?.message?.content);
            }}
          >
            {t('button.viewAll')}
          </span>
        </>
      ),
      title: t('feedback.answer'),
      width: 300,
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (_data: string, record: DeepPartial<Feedback>) => (
        <StatusTag status={record.rating} />
      ),
      title: t('feedback.status'),
      width: 150,
    },
    {
      dataIndex: 'extraFeedback',
      key: 'extraFeedback',
      render: (_data: string, record: DeepPartial<Feedback>) => (
        <div>
          <Typography.Text className="mb-2 block">
            {record.text}
          </Typography.Text>
          {record.tags &&
            record?.tags?.map(item => (
              <Tag key={item}>
                {TAG_MESSAGES.find(tag => tag.value === item)?.text}
              </Tag>
            ))}
        </div>
      ),
      title: t('feedback.extraFeedback'),
      width: 230,
    },
  ];

  const onSearch = () => {
    form.validateFields().then(values => {
      setQueryParams(values);
    });
  };

  useEffect(() => {
    prefetchFeedbacks();
    navigate({
      search: queryString,
    });
  }, [navigate, queryString]); // eslint-disable-line

  return (
    <div className="shadow-shadow-default mr-2 px-6">
      <Typography.Text className="flex gap-2 py-4 text-2xl font-semibold text-primary-color">
        <Button
          className="shadow-none h-fit w-fit border-none p-0 text-2xl text-primary-color"
          onClick={() => navigate('/')}
        >
          <LeftCircleOutlined />
        </Button>
        {t('feedback.title')}
      </Typography.Text>
      <div className="mt-6 flex items-center gap-5">
        <div className="w-1/2">
          <Form form={form}>
            <div className="mt-6 flex items-center gap-5">
              <div className="w-1/2">
                <Form.Item name="search">
                  <Input
                    allowClear={{
                      clearIcon: (
                        <Button
                          className="h-fit w-fit border-none"
                          icon={<CloseCircleOutlined className="text-sm" />}
                          onClick={() =>
                            setQueryParams({
                              rating: queryParams.rating,
                            })
                          }
                        />
                      ),
                    }}
                    className="rounded-lg"
                    onPressEnter={onSearch}
                    placeholder={t('feedback.placeholder.search')}
                    suffix={<SearchOutlined />}
                  />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item name="rating">
                  <StyledSelect
                    allowClear
                    className="rounded-lg"
                    defaultActiveFirstOption
                    onChange={onSearch}
                    placeholder={t('feedback.placeholder.status')}
                  >
                    <Select.Option value="thumbsUp">
                      {t('feedback.like')}
                    </Select.Option>
                    <Select.Option value="thumbsDown">
                      {t('feedback.dislike')}
                    </Select.Option>
                  </StyledSelect>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="w-1/2">
          <div className="flex items-center justify-between gap-4">
            <StatusCard
              icon={<LikeIcon />}
              label={t('feedback.like')}
              total={fetchCountRatingsResponse?.likes}
            />
            <StatusCard
              icon={<DislikeIcon />}
              label={t('feedback.dislike')}
              total={fetchCountRatingsResponse?.dis_likes}
            />
          </div>
        </div>
      </div>
      <TableWrapper>
        <PaginationPanel
          className="py-6"
          current={currentPage || 1}
          pageSize={fetchFeedbacksResponse?.size ?? 10}
          setCurrentPage={setCurrentPage}
          showQuickJumper
          total={fetchFeedbacksResponse?.total ?? 1}
        />
        <Table
          columns={columns}
          dataSource={fetchFeedbacksResponse?.items ?? []}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content', y: '67vh' }}
        />
        <PaginationPanel
          className="flex justify-end py-6 pr-6"
          current={currentPage || 1}
          pageSize={fetchFeedbacksResponse?.size ?? 10}
          setCurrentPage={setCurrentPage}
          showQuickJumper
          total={fetchFeedbacksResponse?.total ?? 1}
        />
        <StyledModal
          footer={false}
          onCancel={() => setViewAll(false)}
          open={viewAll}
        >
          <Typography.Text>{viewAllText}</Typography.Text>
        </StyledModal>
      </TableWrapper>
    </div>
  );
}

export default List;
