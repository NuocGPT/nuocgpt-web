import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { DeepPartial } from '@enouvo/react-uikit';
import { useTable } from '@enouvo/react-uikit';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Select, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-colour.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-colour.svg';
import { QUERY } from '#/services/constants';
import { fetchCountRatings, fetchFeedbacks } from '#/services/feedbacks';
import type {
  CountRatings,
  TFeedback,
  TFeedbacks,
} from '#/services/feedbacks/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { TAG_MESSAGES } from '#/shared/utils/constant';
import { truncateText } from '#/shared/utils/tools';
import PaginationPanel from '../common/PaginationPanel';
import StatusCard from './components/StatusCard';
import StatusTag from './components/StatusTag';
import { StyledSelect } from './components/styles';
import { StyledModal, TableWrapper } from './styles';

dayjs.extend(utc);

function List() {
  const { t } = useTypeSafeTranslation();
  const { currentPage, setCurrentPage } = useTable();
  const [form] = Form.useForm();
  const [viewAll, setViewAll] = useState(false);
  const [viewAllText, setViewAllText] = useState<string | undefined>('');

  const { data: fetchFeedbacksResponse } = useQuery<TFeedbacks>(
    QUERY.getFeedbacks,
    fetchFeedbacks,
  );

  const { data: fetchCountRatingsResponse } = useQuery<CountRatings>(
    QUERY.getCountRatings,
    fetchCountRatings,
  );

  const columns = [
    {
      dataIndex: 'created_at',
      key: 'created_at',
      render: (data: string) =>
        dayjs.utc(data).local().format('DD/MM/YYYY - HH:mm'),
      title: t('feedback.createdAt'),
      width: 170,
    },
    {
      dataIndex: 'users',
      key: 'users',
      render: (_data: string, record: DeepPartial<TFeedback>) =>
        record?.user?.email,
      title: t('feedback.users'),
      width: 230,
    },
    {
      dataIndex: 'questions',
      key: 'questions',
      render: (_data: string, record: DeepPartial<TFeedback>) =>
        record?.question?.content,
      title: t('feedback.questions'),
      width: 200,
    },
    {
      dataIndex: 'answer',
      key: 'answer',
      render: (_data: string, record: DeepPartial<TFeedback>) => (
        <>
          {truncateText(String(record?.message?.content))}
          <span
            className="ml-1 text-primary-color hover:cursor-pointer"
            onClick={() => {
              setViewAll(true);
              setViewAllText(record?.message?.content);
            }}
          >
            View all
          </span>
        </>
      ),
      title: t('feedback.answer'),
      width: 300,
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (_data: string, record: DeepPartial<TFeedback>) => (
        <StatusTag status={record.rating} />
      ),
      title: t('feedback.status'),
      width: 150,
    },
    {
      dataIndex: 'extraFeedback',
      key: 'extraFeedback',
      render: (_data: string, record: DeepPartial<TFeedback>) => (
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

  return (
    <div className="shadow-shadow-default mr-2 px-6">
      <Typography.Text className="block py-4 text-2xl font-semibold text-primary-color">
        {t('feedback.title')}
      </Typography.Text>
      <div className="mt-6 flex items-center gap-5">
        <div className="w-1/2">
          <Form form={form}>
            <div className="mt-6 flex items-center gap-5">
              <div className="w-1/2">
                <Form.Item>
                  <Input
                    className="rounded-lg"
                    placeholder={t('feedback.placeholder.search')}
                    suffix={<SearchOutlined />}
                  />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <Form.Item>
                  <StyledSelect
                    className="rounded-lg"
                    defaultActiveFirstOption
                    placeholder={t('feedback.placeholder.status')}
                  >
                    <Select.Option value="like">
                      {t('feedback.like')}
                    </Select.Option>
                    <Select.Option value="dislike">
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
          pageSize={fetchFeedbacksResponse?.size || 10}
          setCurrentPage={setCurrentPage}
          showQuickJumper
          total={fetchFeedbacksResponse?.total || 0}
        />
        <Table
          columns={columns}
          dataSource={fetchFeedbacksResponse?.items ?? []}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
        <PaginationPanel
          className="flex justify-end py-6 pr-6"
          current={currentPage || 1}
          pageSize={fetchFeedbacksResponse?.size || 10}
          setCurrentPage={setCurrentPage}
          showQuickJumper
          total={fetchFeedbacksResponse?.total || 0}
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
